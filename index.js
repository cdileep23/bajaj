import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(express.json());

app.get('/bhfi', async (req, res) => {
    res.status(200);
    res.send({ "status_code": 1 });
});

app.post('/bhfi', async (req, res) => {
    const { data } = req.body;
    console.log(data);

    let numberList = [];
    let characterList = [];
    let largestLowercaseChar = null;

    data.forEach(element => {
        if (!isNaN(element)) {
            numberList.push(element);
        } else if (typeof element === 'string') {
            characterList.push(element);
            if (element === element.toLowerCase() && (largestLowercaseChar === null || element > largestLowercaseChar)) {
                largestLowercaseChar = element;
            }
        }
    });

    const result = {
        success: true,
        userId: "jane_doe_202309",
        emailAddress: "jane@domain.com",
        studentId: "WXYZ456",
        numbers: numberList,
        characters: characterList,
        highestLowercaseCharacter: largestLowercaseChar ? [largestLowercaseChar] : []
    };

    res.status(200);
    res.send(result);
});

app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080/');
});
