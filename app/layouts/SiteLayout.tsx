const SiteLayout = ({ children }) => <>{children}</>

export const getDefaultLayout = (page) => <SiteLayout>{page}</SiteLayout>

export default SiteLayout
