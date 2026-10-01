import React from 'react'
import { Loader} from 'lucide-react'

const DashboardLoading = () => {
  return (
    <main className="flex min-h-[calc(100vh-73px)] min-w-0 flex-1 items-center justify-center">

    <div className="flex flex-col items-center">

        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]">

        <div className="absolute inset-0 animate-pulse rounded-2xl bg-slate-100" />

        <Loader
            size={23}
            strokeWidth={1.8}
            className="relative animate-spin text-slate-700"
        />

        </div>

        <p className="mt-4 text-xs font-semibold text-slate-400">
        Preparing your workspace...
        </p>

    </div>

    </main>
  )
}

export default DashboardLoading
