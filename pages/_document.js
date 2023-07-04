import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {...initialProps};
    }

    render() {
        return (
            <Html>
                <Head>
                    {/* 이 부분에 meta 태그를 추가하세요 */}
                    <meta name="viewport"
                          content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=0"/>
                    {/* 기타 필요한 태그들과 스타일시트, 스크립트 등을 포함하세요 */}
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
