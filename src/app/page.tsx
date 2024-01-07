import About from '@/components/home_sections/about'
import Header from "@/components/home_sections/header";
import Portfolio from "@/components/home_sections/portfolio";
import Summarize from "@/components/home_sections/summarize";
import Contact from "@/components/home_sections/contact";
import Script from "next/script";

import '../../public/css/bootstrap.min.css'
import '../../public/css/font-awesome.min.css'
import '../../public/css/animate.min.css'
import '../../public/css/jquery.fullPage.css'
import '../../public/css/templatemo-style.css'
import Footer from "@/components/home_sections/footer";
import React from "react";
import ResponsiveAppBar from "@/components/home_sections/responsiveAppBar";


export const metadata = {
    title: 'Home - CorteStudios',
    description: 'Page description',
}

export default async function Home() {
    return (
        <div>
            {/*NOT CHANGE THE ORDER CAUSE CAN HAVE ERRORS*/}
            <Script src="/js/jquery.js" strategy={"beforeInteractive"} />
            <Script src="/js/smoothscroll.js" strategy={"lazyOnload"} />
            <Script src="/js/bootstrap.min.js" strategy={"lazyOnload"} />
            <Script src="/js/jquery.simple-text-rotator.js" strategy={"beforeInteractive"} />
            <Script src="/js/jquery.fullPage.js" strategy={"beforeInteractive"} />
            <Script src="/js/wow.min.js" strategy={"beforeInteractive"} />
            <Script src="/js/custom.js" strategy={"lazyOnload"} />

            <ResponsiveAppBar/>
            <Header/>
            <Summarize/>
            <About/>
            <Portfolio/>
            <Contact/>
            <Footer/>
        </div>
    )
}