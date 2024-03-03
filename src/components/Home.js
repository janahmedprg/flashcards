import React, { useState, useEffect } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import {
    Box,
    Text,
    Button,
    Input,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";
import SubmitFile from '../functions/submitFile';
import RenderCardSets from '../functions/renderCardSets';
import '../styles/spinner.css';

const Home = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [studySetName, setStudySetName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cardSets, setCardSets] = useState([]);
    const [studying, setStudying] = useState(false);



    // Fetch cardSets data
    useEffect(() => {
        fetchCardSets(); // Fetch card sets when the component mounts
    }, []);

    const fetchCardSets = () => {

        const credentials = 'eli:elipass'
        const encodedCredentials = btoa(credentials);


        fetch('http://34.42.246.209:5000/user/65e457eaf560f3193f015589/sets', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${encodedCredentials}`,
                },
            })
            .then(response => response.json())
            .then(data => {
                setCardSets(data);
            })
            .catch(error => console.error('Error fetching card sets:', error));

    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        // Reset the input element's value
        document.getElementById("fileInput").value = "";
    };

    const handleSubmit = () => {
        if (selectedFile && studySetName.trim() !== '') {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('upload', selectedFile);
            formData.append('set_name', studySetName);
            
            const credentials = 'eli:elipass'
            const encodedCredentials = btoa(credentials);
            console.log(encodedCredentials)
            fetch('http://34.42.246.209:5000/user/65e457eaf560f3193f015589/sets', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${encodedCredentials}`,
                },
            })
                .then(response => {
                    if (response.ok) {
                        console.log('File uploaded successfully');
                        // Optionally, you can reset the file input here
                        setSelectedFile(null);
                        setStudySetName('');
                        //fetchCardSets(); // Fetch updated card sets after submission
                        return response.json();
                    } else {
                        console.error('Failed to upload file');
                    }
                })
                .then((data) => setCardSets([...cardSets, data]))
                .catch(error => console.error('Error uploading file:', error))
                .finally(() => {
                    setIsSubmitting(false);
                });
        } else {
            alert("Please select a file and enter a study set name");
        }
    };








    
    return (
        <div className="App" style={{ backgroundColor: "#0f4a7d"}}>
            <div>
                <div style={{padding :'20px'}}>
                </div>
                <span
                    style={{
                        marginLeft: "5%",
                        marginRight: "50%",
                        fontSize: "150%",
                        marginTop: "50px",
                        color: "white",
                    }}
                >
                    Upload your notes or lectures here
                </span>
                <ChakraProvider />
                <form encType='multipart/form-data'  >
                <Input
                    id="upload" // Add an id to the input element
                    style={{
                        width: "75%",
                        height: "200px",
                        textalign: "center",
                        fontSize: "50px",
                    }}
                    type="file"
                    placeholder="Upload File"
                    onChange={handleFileChange}
                />
                <Input
                    id="set_name"
                    style = {{
                        width: "50%",
                        height: "50px",
                        fontSize: "150%",
                        color: 'white',
                        borderWidth: "3px", // Adjust the border width
                        borderStyle: "solid", // Ensure border style is solid
                        borderRadius: "5px", // Add border radius if desired
                        borderColor: "White" // Set border color
                    }}
                    type="text"
                    placeholder="Enter a title for your study set"
                    _placeholder={{ color: 'white' }}
                    value={studySetName}
                    onChange={(e) => setStudySetName(e.target.value)} />
                </form>
                <ChakraProvider />
            </div>

            <div style={{padding:'20px'}}>
            </div>

            <div>
                <ChakraProvider>
                    {isSubmitting ? <div className="spinner"></div> : 
                    
                    <><Button
                            style={{
                                marginLeft: "2%",
                                marginTop: "20px",
                                width: "20%",
                                height: "50px",
                                fontSize: "150%",
                            }}
                            colorScheme="blue"
                            onClick={handleRemoveFile}
                            disabled={!selectedFile}
                        >
                            Remove
                        </Button><Button
                            style={{
                                marginLeft: "2%",
                                marginTop: "20px",
                                width: "20%",
                                height: "50px",
                                fontSize: "150%",
                            }}
                            colorScheme="blue"
                            onClick={handleSubmit}
                            disabled={!selectedFile || studySetName.trim() === '' || isSubmitting}
                        >
                                Submit
                            </Button></> }
                    
                </ChakraProvider>
            </div>

            <div style={{ paddingTop: "20px" }}>
                <div style={{ backgroundColor: "#f15c58", padding: "10px" }}>
                  <h1 style={{ fontSize: "200%", margin: "0", color: "#333", fontWeight: "bold"}}>Your Study Sets</h1>
                </div>
            </div>
            {/* {fetchCardSets()} */}
            {RenderCardSets({cardSets})}
        </div>
    );
};

export default Home;
