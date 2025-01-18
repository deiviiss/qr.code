import QRGenerator from '@/components/qr-code/QrGenerator'

export default function QrPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 sm:min-w-80">
          <QRGenerator />
        </div>
      </div>
    </main>
  )
}
