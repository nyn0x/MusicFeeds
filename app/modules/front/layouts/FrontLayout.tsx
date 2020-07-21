import NavbarFront from "../components/Navbar/NavbarFront"

const FrontLayout = ({ children }) => <>{children}</>

export const getFrontLayout = (page) => (
  <FrontLayout>
    <NavbarFront></NavbarFront> {page}
  </FrontLayout>
)

export default FrontLayout
