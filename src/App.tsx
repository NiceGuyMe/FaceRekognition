import {useState} from "react";
import AWS from "aws-sdk";


AWS.config.update({
    region: 'eu-west-2',
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-2:371cdf1c-657e-4e3f-a6a0-3cdcf905bfdc'
    })
});

const App = () => {
    const [faceDetail, setFaceDetail] = useState<AWS.Rekognition.FaceDetailList>();
    faceDetail[0].
    const [selectedImage, setSelectedImage] = useState();
    const AnonLog = () => {
        AWS.config.region = 'eu-west-2';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'eu-west-2:371cdf1c-657e-4e3f-a6a0-3cdcf905bfdc',
        })
    }
    const ProcessImage = (image: ArrayBuffer) => {
        let rekognition = new AWS.Rekognition();
        AnonLog();
        let params = {
            Image: {
                Bytes: image
            },
            Attributes: [
                'ALL',
            ]
        };
        rekognition.detectFaces(params, function (err, data) {
            if (err) {
                (console.log(err, err.stack))
                return;
            }
            setFaceDetail(data.FaceDetails)
        });
    }
    const imageChange = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            new Response(e.target.files.item(0)).arrayBuffer().then((data) => ProcessImage(data))
        }
    };
    return (
        <>
            <div>
                <input
                    accept="image/*"
                    type="file"
                    onChange={imageChange}
                />
                {selectedImage && (
                    <div>
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Thumb"
                        />
                    </div>
                )}
            </div>
            <h1>{}</h1>
            <h1>{}</h1>
        </>
    );
};

export default App;