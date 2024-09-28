import { exec } from "child_process";

const subdomainly = (req, res) => {
    // Verifikasi payload jika perlu (misalnya, verifikasi signature GitHub)
    console.log("PUSH EVENT RECEIVED: SUBDOMAINLY");

    // Menjalankan perintah git pull dan docker-compose
    exec(
        "cd /home/dean/Projects/subdomainly && git pull && docker compose down && docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build",
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
