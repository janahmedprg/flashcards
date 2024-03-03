import React, { useState } from 'react';
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

const Home = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [studySetName, setStudySetName] = useState('');

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
        const formData = new FormData();
        formData.append('file', selectedFile);
    
        fetch('/upload', {
          method: 'POST',
          body: formData
        })
        .then(response => {
          if (response.ok) {
            console.log('File uploaded successfully');
            // Optionally, you can reset the file input here
            setSelectedFile(null);
            setStudySetName('');
          } else {
            console.error('Failed to upload file');
          }
        })
        .catch(error => console.error('Error uploading file:', error));
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
                <form enctype='multipart/form-data'  >
                <Input
                    id="fileInput" // Add an id to the input element
                    style={{
                        width: "75%",
                        height: "200px",
                        textalign: "center",
                        fontSize: "100px",
                    }}
                    type="file"
                    placeholder="Upload File"
                    onChange={handleFileChange}
                />
                </form>
                <ChakraProvider />
            </div>

            <div style={{padding:'20px'}}>
                  <ChakraProvider>
                    <Input 
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
                    </ChakraProvider>  
            </div>

            <div>
                <ChakraProvider>
                    <Button
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
                    </Button>
                    <Button
                        style={{
                            marginLeft: "2%",
                            marginTop: "20px",
                            width: "20%",
                            height: "50px",
                            fontSize: "150%",
                        }}
                        colorScheme="blue"
                        onClick={handleSubmit}
                        disabled={!selectedFile || studySetName.trim() === ''}
                    >
                        Submit
                    </Button>
                </ChakraProvider>
            </div>

            <div style={{ paddingTop: "20px" }}>
                <div style={{ backgroundColor: "#f15c58", padding: "10px" }}>
                  <h1 style={{ fontSize: "200%", margin: "0", color: "#333", fontWeight: "bold"}}>Your Study Sets</h1>
                </div>

                
            </div>
        </div>
    );
};

export default Home;
