import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import { getRandomValues } from 'crypto';
import { IV_SIZE } from './utils';

type AppOwnProps = { example: string }

export default function MyApp({ Component, pageProps }: AppProps & AppOwnProps) {
    const iv = getRandomValues(new Uint8Array(IV_SIZE));
    console.log('iv created: ', iv);

    return <Component {...pageProps} iv={iv} />
}

MyApp.getInitialProps = async (
    context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
    const ctx = await App.getInitialProps(context)

    return { ...ctx, example: 'data' }
}