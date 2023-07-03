import React from 'react';
import {AppProps} from 'next/app';
import Layout from "@/components/layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/app/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from "@/components/header";
import Footer from "@/components/footer";

const MyApp: React.FC<AppProps> = ({Component, pageProps}) => {
    return (
        <>
            <div className={"main-container"}>
                <Header/>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <Footer/>
            </div>
        </>
    );
};

export default MyApp;