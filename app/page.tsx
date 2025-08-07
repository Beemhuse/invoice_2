"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCookie } from "@/lib/cookie-utils"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = getCookie("isLoggedIn")
    if (isLoggedIn) {
      router.push("/a/dashboard")
    } else {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-nanocodes-primary/5 to-nanocodes-secondary/10">
      <div className="text-center">
        <div className="w-16 h-16 bg-nanocodes-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-xl">N</span>
        </div>
        <h1 className="text-2xl font-bold text-nanocodes-primary mb-2">NanoCodes Invoice System</h1>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
}
