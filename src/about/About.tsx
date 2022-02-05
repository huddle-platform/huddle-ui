import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";

const About: React.FC = () => {
    return (
        <div className="about">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography>About us</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        We are a student group at TUM with the goal of bringing students together in their personal projects.
                        <br/>
                        Feel free to <a href="mailto: tum-project-hub@protonmail.com">reach out to us</a> for any questions, suggestions or feedback!
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography>Imprint</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Ole Petersen
                        <br />
                        Student Group Huddle
                        <br />
                        Technische Universität München
                        <br />
                        Studentische Vertretung
                        <br />
                        Arcisstr. 21
                        <br />
                        80333 München
                        <br />
                        <a href="mailto: tum-project-hub@protonmail.com">tum-project-hub@protonmail.com</a>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography>Data we collect</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Generally, we do not collect any data about you that you would not expect yourself. If you are just surfing around projects, we won't save any personal data about you. The only data that may leak out to third parties is your public IP address since project images may be loaded from third parties.
                        <br />
                        However things change when you create a user account: We obviously need to store all the data you enter (username, password hashes, name, the projects you create, saved projects, messages...) on our server. We do not share these data with third parties.
                        <br />
                        If you wish us to find send you or delete all your data, <a href="mailto: tum-project-hub@protonmail.com">just send us an email</a>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography>Terms of use</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Do not share anything illegal or copyrighted on Huddle!
                        <br />
                        Also, feel free to <a href="mailto: tum-project-hub@protonmail.com">reach out to us</a> when you see illegal content.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div >
    );
}
export default About;