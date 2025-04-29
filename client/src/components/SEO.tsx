import { Helmet } from "react-helmet-async";

export interface Page {
    title: string;
    description: string;
    keywords: string;
    type: string;
}

interface Props {
    page: Page;
}

const SEO = ({ page }: Props) => {
    return (
        <Helmet>
            <title>{page.title}</title>
            <meta name="description" content={page.description} />
            {/* Facebook tags */}
            <meta property="og:type" content={page.type} />
            <meta property="og:title" content={page.title} />
            <meta property="og:description" content={page.description} />
            {/* Twitter tags */}
            <meta name="twitter:creator" content="Charles Nguyen" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={page.title} />
            <meta name="twitter:description" content={page.description} />
            {/* Other tags */}
            <meta name="keywords" content={page.keywords} />
            <meta name="robots" content="index, follow" />
        </Helmet>
    );
};

export default SEO;
