import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { globalStyles } from "../styles/global"
import { getCssText } from "../styles"
import { Container, Header } from '../styles/app/layout';
import logoImg from "../assets/logo.svg"
import Image from "next/image"

const roboto = Roboto({ weight:['400','700'], subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Ignite shop',
    template: '%s'
  }
};

globalStyles()

function RootLayout({ children }: { children: React.ReactNode }) {
 
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </head>
 
      <body className={roboto.className} suppressHydrationWarning={true}>
        <Container>
          <Header>
            <Image src={logoImg} alt="" />
          </Header>
          {children}
        </Container>
      </body>
    </html>
  )
}

export default RootLayout;