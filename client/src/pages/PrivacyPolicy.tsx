import { Box, Heading, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
    return (
        <VStack width="100%">
            <VStack alignItems="flex-start" mt={8} maxWidth={"900px"} width="100%" padding={4}>
                <Heading as="h1" size="h1" textAlign="center" mb={8}>Call of Dragons Wiki Privacy Policy</Heading>
                <Box mb={4}>
                    <Text fontWeight="bold">Last Modified: January 01, 2025</Text>
                    <Text>
                        Call of Dragons Wiki ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data.
                    </Text>
                </Box>
                <Box mb={8}>
                    <Heading as="h2" fontSize="1.728rem">1. Information We Collect</Heading>
                    <Box>
                        <Text>
                            We may collect limited information from users, including:
                        </Text>
                        <UnorderedList>
                            <ListItem>
                                <Text>
                                    Non-personal data such as browser type, device, operating system, and general site usage statistics (e.g., via Google Analytics).
                                </Text>
                            </ListItem>
                            <ListItem>
                                <Text>
                                    Contact information only if you voluntarily submit it (e.g., via a contact form or email).
                                </Text>
                            </ListItem>
                        </UnorderedList>
                    </Box>
                </Box>
                <Box mb={8}>
                    <Heading as="h2" fontSize="1.728rem">2. How We Use Your Information</Heading>
                    <Box>
                        <Text>
                            We use collected data to:
                        </Text>
                        <UnorderedList>
                            <ListItem>
                                <Text>
                                    Improve the Website’s performance and content.
                                </Text>
                            </ListItem>
                            <ListItem>
                                <Text>
                                    Understand how users interact with the Website.
                                </Text>
                            </ListItem>
                            <ListItem>
                                <Text>
                                    Respond to messages or inquiries you send us.
                                </Text>
                            </ListItem>
                        </UnorderedList>
                        <Text>
                            We do <Text as="span" fontWeight="bold">not</Text> sell, rent, or share your personal information with third parties.
                        </Text>
                    </Box>
                </Box>
                <Box mb={8}>
                    <Heading as="h2" fontSize="1.728rem">3. Cookies</Heading>
                    <Text>
                        We may use cookies to enhance user experience. Cookies are small data files stored on your device. You can disable cookies through your browser settings, though some features of the Website may not function properly.
                    </Text>
                </Box>
                <Box mb={8}>
                    <Heading as="h2" fontSize="1.728rem">4. Third-Party Services</Heading>
                    <Box>
                        <Text>
                            We may use third-party services like:
                        </Text>
                        <UnorderedList>
                            <ListItem>
                                <Text>
                                    <Text as="span" fontWeight="bold">Google Analytics</Text> – to collect anonymized traffic data.
                                </Text>
                            </ListItem>
                            <ListItem>
                                <Text>
                                    <Text as="span" fontWeight="bold">Social media embeds or links</Text> – such as LinkedIn or Discord, which may collect data according to their own privacy policies.
                                </Text>
                            </ListItem>
                        </UnorderedList>
                    </Box>
                    <Text>
                        We are not responsible for the privacy practices of external websites or services linked to from our Website.
                    </Text>
                </Box>
                <Box mb={8}>
                    <Heading as="h2" fontSize="1.728rem">5. Donations and Payment Processors</Heading>
                    <Text>
                        If you choose to support us by making a donation, your payment will be processed securely by third-party services such as Stripe or PayPal. We do not collect or store your payment details. These services may collect personal and financial information in accordance with their own privacy policies. We encourage you to review their policies here:
                    </Text>
                    <UnorderedList>
                        <ListItem cursor="pointer" className="privacy-policy-list-item">
                            <Link
                                to="https://stripe.com/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link">
                                Stripe Privacy Policy
                            </Link>
                        </ListItem>
                        <ListItem cursor="pointer" className="privacy-policy-list-item">
                            <Link
                                to="https://www.paypal.com/us/legalhub/paypal/privacy-full"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link">
                                PayPal Privacy Policy
                            </Link>
                        </ListItem>
                    </UnorderedList>
                </Box>
                <Box mb={8}>
                    <Heading as="h2" fontSize="1.728rem">6. Data Security</Heading>
                    <Text>
                        We implement standard measures to protect the data we collect. However, no method of transmission or storage is 100% secure.
                    </Text>
                </Box>
                <Box mb={8}>
                    <Heading as="h2" fontSize="1.728rem">7. Children’s Privacy</Heading>
                    <Text>
                        This Website is not intended for children under 13. We do not knowingly collect personal information from children.
                    </Text>
                </Box>
                <Box mb={8}>
                    <Heading as="h2" fontSize="1.728rem">8. Changes to This Policy</Heading>
                    <Text>
                        We may update this Privacy Policy from time to time. Changes will be posted on this page with a new effective date.
                    </Text>
                </Box>
            </VStack>
        </VStack>
    )
}

export default PrivacyPolicy;