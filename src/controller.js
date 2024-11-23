import { exec } from "child_process";

const subdomainly = (req, res) => {
    // Verifikasi payload jika perlu (misalnya, verifikasi signature GitHub)
    console.log("PUSH EVENT RECEIVED: SUBDOMAINLY");

    const path = "/home/dean-cloud/github/subdomainly";
    const git = "git pull";
    const dockerCompose = "docker compose down && docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build";
    const command = `cd ${path} && ${git} && ${dockerCompose}`;

    // Menjalankan perintah git pull dan docker-compose
    try {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).send("Pull and deploy failed");
            }

            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);

            res.status(200).send("Pull and deploy successful");
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};

const posyandu  = (req, res) => {
    console.log("PUSH EVENT RECEIVED: POSYANDU");
    exec(
        `eval "$(ssh-agent -s)" && ssh-add /home/dean/.ssh/id_rsa && cd /home/dean/Projects/subdomainly && git pull && docker compose down && docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build`,
        (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).send("Pull and deploy failed");
            }

            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);

            res.status(200).send("Pull and deploy successful");
        }
    );
}

export default { subdomainly, posyandu };
