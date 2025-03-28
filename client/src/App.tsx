import { Box } from '@chakra-ui/react'
import HeroTalents from './components/HeroTalents';

function App() {

  return (
    <>
      <Box width="100%" mt={10}>
        {/* <Talent isSelected={false} isActive={true} /> */}
          <HeroTalents />
          {/* <RoleBadge /> */}
      </Box>
    </>
  )
}

export default App
