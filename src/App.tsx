import {useState} from "react";
import AWS from "aws-sdk";


AWS.config.update({
    region: 'eu-west-2',
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-2:371cdf1c-657e-4e3f-a6a0-3cdcf905bfdc'
    })
});

const App = () => {
    const [smile, setSmile] = useState<any>();
    const [hightAge, setHightAge] = useState<any>();
    const [eyeGlasses, setEyeGlasses] = useState<any>();
    const [Beard, setBeard] = useState<any>();
    const [quality1, setQuality1] = useState<any>();
    const [quality2, setQuality2] = useState<any>();
    const [lowAge, setLowAge] = useState<any>();
    const [mustache, setMustache] = useState<any>();
    const [sunglasses, setSunglasses] = useState<any>();
    const [selectedImage, setSelectedImage] = useState<any>();
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
                data.FaceDetails?.map((i)=>{
                    setSmile(i.Smile?.Confidence)
                    setHightAge(i.AgeRange?.High)
                    setLowAge(i.AgeRange?.Low)
                   setEyeGlasses( i.Eyeglasses?.Confidence)
                    setBeard(i.Beard?.Confidence)
                    setQuality1(i.Quality?.Sharpness)
                    setQuality2(i.Quality?.Brightness)
                    setMustache(i.Mustache?.Confidence)
                    setEyeGlasses(i.Eyeglasses?.Confidence)
                    setSunglasses(i.Sunglasses?.Confidence)
                })
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
                <div className="container-fluid py-5" id="about">
                    <div className="container">
                        <div className="position-relative d-flex align-items-center justify-content-center">
                            <h1 className="position-absolute text-uppercase text-primary">About Me</h1>
                        </div>
                        <div className="row align-items-center">
                            {selectedImage && (
                            <div className="col-lg-5 pb-4 pb-lg-0">
                                <img className="img-fluid rounded w-100" src={URL.createObjectURL(selectedImage)}
                                     alt="Thumb"/>
                            </div>
                            )}
                            <div>
                                <input
                                    accept="image/*"
                                    type="file"
                                    className="btn btn-outline-primary mr-4"
                                    onChange={imageChange}
                                />
                            </div>
                            <div className="col-lg-7">
                                <div className="row mb-3">
                                    <div className="col-sm-6 py-2"><h6>smile: <span className="text-secondary">{smile} % </span></h6></div>
                                    <div className="col-sm-6 py-2"><h6>Age : <span className="text-secondary"> between {hightAge} and {lowAge} </span></h6></div>
                                    <div className="col-sm-6 py-2"><h6>Beard: <span className="text-secondary">{Beard}</span></h6></div>
                                    <div className="col-sm-6 py-2"><h6>sunglasses: <span className="text-secondary">{sunglasses}</span></h6></div>
                                    <div className="col-sm-6 py-2"><h6>eyeGlasses: <span className="text-secondary">{eyeGlasses}</span></h6></div>
                                    <div className="col-sm-6 py-2"><h6>image quality: <span className="text-secondary">{quality1}</span></h6></div>
                                    <div className="col-sm-6 py-2"><h6>image quality: <span className="text-secondary">{quality2}</span></h6></div>
                                    <div className="col-sm-6 py-2"><h6>mustache: <span className="text-secondary">{mustache}</span></h6></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
}
export default App;