"use client";

import { LocaleSwitcher, useT } from "@/shared/i18n";
import { useSession } from "@/shared/session";

export function SettingsView() {
  const { name, role } = useSession();
  const t = useT();
  const rows = [
    [t.settings.name, name],
    [t.settings.role, t.settings.roles[role]],
  ];

  return (
    <section className="max-w-xl rounded-xl bg-card p-5 shadow-sm">
      <h1 className="text-2xl">{t.screens.settings}</h1>
      <dl className="mt-4 grid gap-3">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs uppercase text-vet-gray">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
        <div>
          <dt className="mb-1 text-xs uppercase text-vet-gray">{t.common.language}</dt>
          <dd>
            <LocaleSwitcher />
          </dd>
        </div>
      </dl>
    </section>
  );
}
