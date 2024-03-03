import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Button, Input } from '@chakra-ui/react';
import '../styles/spinner.css';
import '../styles/homeStyles.css';

const Home = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [studySetName, setStudySetName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cardSets, setCardSets] = useState([]);

    const [credentials, setCredentials] = useState(
        localStorage.getItem('credentials')
    );
    const [currUserId, setCurrUserId] = useState(
        localStorage.getItem('currUserId')
    );

    useEffect(() => {
        setCredentials(localStorage.getItem('credentials'));
        setCurrUserId(localStorage.getItem('currUserId'));
    }, []);

    //   const fetchCardSets = () => {
    //     // Fetch card sets data here
    //     // Example fetch call
    //     fetch("http://example.com/cardsets")
    //       .then((response) => response.json())
    //       .then((data) => setCardSets(data))
    //       .catch((error) => console.error("Error fetching card sets:", error));
    //   };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        // Reset the input element's value
        document.getElementById('fileInput').value = '';
    };

    const handleFetch = () => {
        fetch(`http://34.42.246.209:5000/user/${currUserId}/sets`, {
            method: 'Get',
            headers: {
                Authorization: `Basic ${credentials}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    console.log('File uploaded successfully');
                } else {
                    console.error('Failed to upload file');
                }
                return response.json();
            })
            .then((data) => {
                setIsSubmitting(false);
                console.log(data);
                setCardSets(data);
            });
    };

    const handleSubmit = () => {
        if (selectedFile && studySetName.trim() !== '') {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('upload', selectedFile);
            formData.append('set_name', studySetName);
            fetch(`http://34.42.246.209:5000/user/${currUserId}/sets`, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Basic ${credentials}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('File uploaded successfully');
                        // Optionally, you can reset the file input here
                        setSelectedFile(null);
                        setStudySetName('');
                    } else {
                        console.error('Failed to upload file');
                    }
                })
                .catch((error) => console.error('Error uploading file:', error))
                .finally(() => {
                    setIsSubmitting(false);
                });
        } else {
            alert('Please select a file and enter a study set name');
        }
    };

    return (
        <div className='container-home'>
            <div>
                <p className='uploadText'>Upload your notes or lectures here</p>
                <ChakraProvider>
                    <form encType='multipart/form-data'>
                        <Input
                            id='upload' // Add an id to the input element
                            style={{
                                marginTop: '20px',
                                marginBottom: '20px',
                                paddingLeft: '30px',
                                width: '75%',
                                height: '50px',
                                fontSize: '1.6rem',
                                lineHeight: '20px',
                                borderRadius: '20px',
                            }}
                            type='file'
                            placeholder='Upload File'
                            onChange={handleFileChange}
                        />
                        <Input
                            id='set_name'
                            style={{
                                paddingLeft: '30px',
                                width: '75%',
                                height: '50px',
                                fontSize: '1.6rem',
                                color: 'white',
                                borderWidth: '3px', // Adjust the border width
                                borderStyle: 'solid', // Ensure border style is solid
                                borderRadius: '20px', // Add border radius if desired
                                borderColor: 'White', // Set border color
                            }}
                            type='text'
                            placeholder='Enter a title for your study set'
                            fontSize={'1px'}
                            _placeholder={{ color: 'white' }}
                            value={studySetName}
                            onChange={(e) => setStudySetName(e.target.value)}
                        />
                    </form>
                </ChakraProvider>
            </div>
            <div>
                <ChakraProvider>
                    {isSubmitting ? (
                        <div className='spinner'></div>
                    ) : (
                        <div>
                            <Button
                                style={{
                                    marginTop: '20px',
                                    width: '20%',
                                    height: '50px',
                                    fontSize: '150%',
                                    borderRadius: '20px',
                                }}
                                colorScheme='red'
                                onClick={handleRemoveFile}
                                disabled={!selectedFile}
                            >
                                Remove
                            </Button>
                            <Button
                                style={{
                                    marginLeft: '5%',
                                    marginTop: '20px',
                                    width: '20%',
                                    height: '50px',
                                    fontSize: '150%',
                                    borderRadius: '20px',
                                }}
                                colorScheme='green'
                                onClick={handleSubmit}
                                disabled={
                                    !selectedFile ||
                                    studySetName.trim() === '' ||
                                    isSubmitting
                                }
                            >
                                Submit
                            </Button>
                            <Button
                                style={{
                                    marginLeft: '5%',
                                    marginTop: '20px',
                                    width: '20%',
                                    height: '50px',
                                    fontSize: '150%',
                                    borderRadius: '20px',
                                }}
                                colorScheme='blue'
                                onClick={handleFetch}
                                // disabled={
                                //   !selectedFile || studySetName.trim() === "" || isSubmitting
                                // }
                            >
                                Refresh
                            </Button>
                        </div>
                    )}
                </ChakraProvider>
            </div>

            <div style={{ marginTop: '60px' }}>
                <div
                    style={{
                        padding: '30px',
                        borderColor: '#f15c58',
                        borderWidth: '3px',
                        borderRadius: '30px',
                    }}
                >
                    <h1
                        style={{
                            fontSize: '200%',
                            margin: '0',
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                    >
                        Your Study Sets
                    </h1>
                </div>
            </div>
            <div
                style={{
                    borderColor: '#f15c58',
                    borderWidth: '3px',
                    marginTop: '30px',
                    borderRadius: '30px',
                    padding: '30px',
                }}
            >
                {cardSets ? (
                    cardSets.map((cardSet, index) => (
                        <div key={index}>
                            <Button colorScheme='blue'>
                                {cardSet.set_name}
                            </Button>
                        </div>
                    ))
                ) : (
                    <h1>No card sets found</h1>
                )}
            </div>
        </div>
    );
};

export default Home;
