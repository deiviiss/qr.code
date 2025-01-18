'use client'

import { Label } from '@radix-ui/react-dropdown-menu'
import { Download } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useState, useRef } from 'react'
import { noticeFailure } from '@/components/toast-notifications/ToastNotifications'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function isValidUrl(url: string): boolean {
  try {
    return Boolean(new URL(url))
  } catch {
    return false
  }
}

export default function QRGenerator() {
  const [url, setUrl] = useState('')
  const [qrGenerated, setQrGenerated] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)

  const handleGenerate = () => {
    if (!url.trim()) {
      noticeFailure('Por favor, introduce un enlace válido')
      return
    }

    if (!isValidUrl(url)) {
      noticeFailure('No es un enlace válido')
      return
    }
    setQrGenerated(true)
  }

  const downloadQR = () => {
    if (!qrRef.current) return

    // Create temporary canvas
    const canvas = document.createElement('canvas')
    const svg = qrRef.current.querySelector('svg')

    if (!svg) {
      return
    }

    const svgData = new XMLSerializer().serializeToString(svg)
    const img = new Image()

    img.onload = () => {
      const desiredSize = 512
      canvas.width = desiredSize
      canvas.height = desiredSize
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        return
      }
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, desiredSize, desiredSize)

      // Download the image
      const link = document.createElement('a')
      link.download = 'qr-code.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <Label
        className="text-gray-500 pb-1">Introduce tu enlace aquí</Label>
      <Input
        type="text"
        placeholder="https://mienlace.com"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
        value={url}
        onChange={(e) => { setUrl(e.target.value) }}
      />
      <Button
        onClick={handleGenerate}
        className="w-full mt-4"
        variant="default"
      >
        Generar QR
      </Button>
      {qrGenerated && (
        <div className="mt-8 space-y-4">
          <div ref={qrRef} className="flex justify-center">
            <QRCodeSVG value={url} size={256} />
          </div>
          <Button
            onClick={downloadQR}
            className="w-full"
            variant="outline"
          >
            <Download className="mr-2 h-4 w-4" />
            Descargar QR
          </Button>
        </div>
      )}
    </div>
  )
}
