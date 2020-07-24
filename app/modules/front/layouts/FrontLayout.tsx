import NavbarFront from "../components/Navbar/NavbarFront"
import { dynamic } from "blitz"
// import Player from "../components/Player"
const Player = dynamic(() => import("../components/Player"), { ssr: false })

const FrontLayout = ({ children }) => <>{children}</>

export const getFrontLayout = (page) => (
  <FrontLayout>
    <NavbarFront></NavbarFront> {page}
    <Player />
  </FrontLayout>
)

export default FrontLayout
