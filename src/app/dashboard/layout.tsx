import './global.css'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <div className="bg-blue-500 font-bold py-20 text-blue-800">
      {children}
    </div>
  )
}