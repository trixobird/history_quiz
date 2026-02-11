"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateLocale } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/i18n/locale-context"
import type { Locale } from "@/lib/i18n/dictionaries"

export function LanguageSelector({ currentLocale }: { currentLocale: Locale }) {
  const [selected, setSelected] = useState<Locale>(currentLocale)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const { dict } = useLocale()

  async function handleSave() {
    setSaving(true)
    try {
      await updateLocale(selected)
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value as Locale)}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm"
      >
        <option value="en">English</option>
        <option value="el">Ελληνικά</option>
      </select>
      <Button
        onClick={handleSave}
        disabled={saving || selected === currentLocale}
        size="sm"
      >
        {saving ? "..." : dict.save}
      </Button>
    </div>
  )
}
