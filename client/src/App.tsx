import { HStack } from '@chakra-ui/react'
import HeroTalents from './components/HeroTalents';

function App() {

  return (
    <>
      <HStack width="100%" justifyContent="center" mt={10}>
        {/* <Talent isSelected={false} isActive={true} /> */}
          <HeroTalents />
      </HStack>
    </>
  )
}

export default App
