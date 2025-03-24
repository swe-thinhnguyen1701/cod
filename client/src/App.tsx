import { HStack } from '@chakra-ui/react'
import FoundationTalents from './components/FoudationTalents'
import TalentProvider from "./state-management/talents/TalentProvider";
import TalentGrid from './components/TalentGrid';

function App() {

  return (
    <>
      <HStack width="100%" justifyContent="center" mt={10}>
        {/* <Talent isSelected={false} isActive={true} /> */}
        <TalentProvider>
          <TalentGrid />
          <FoundationTalents />
        </TalentProvider>
      </HStack>
    </>
  )
}

export default App
