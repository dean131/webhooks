import { exec } from "child_process";

const subdomainly = (req, res) => {
    // Verifikasi payload jika perlu (misalnya, verifikasi signature GitHub)
    console.log("PUSH EVENT RECEIVED");

    // Menjalankan perintah git pull dan docker-compose
    exec(
        "cd /home/dean/Projects/subdomainly && git pull && docker compose down && docker compose up -d",
        (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error}`);
                return res.status(500).send("Error occurred");
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            res.status(200).send("Pull and deploy successful");
        }
    );
};

export default {
    subdomainly,
};
