import Head from 'next/head'
import Image from 'next/image'
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import styles from '../styles/Home.module.css'
import axios from "axios";
import { useState, useEffect } from 'react';

export default function Home() {
  const [contractAddress, setContractAddress] = useState();
  const [tokenId, setTokenId] = useState();
  const [nftTitle, setNftTitle] = useState();
  const [nftImage, setNftImage] = useState();
  const [nftChain, setNftChain] = useState();
  const [nftSymbol, setNftSymbol] = useState();
  const [nftOwner, setNftOwner] = useState();
  const [nftDescription, setNftDescription] = useState();


  console.log( process.env.NEXT_PUBLIC_API_KEY);
  const data = async (event) => {
    const options = {
      method: 'GET',
      url: `https://api.nftport.xyz/v0/nfts/${contractAddress}/${tokenId}`,
      params: {
        chain: 'ethereum'
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.NEXT_PUBLIC_API_KEY
      }
    };

    //data -> stores the response data
    let data;
    await axios.request(options)
    .then( (response) =>  {
      console.log(response, "uhfdsif");
      try {
      data = response.data
      setNftTitle(data.contract.name)
      setNftImage(data.nft.metadata.image)
      setNftChain(data.nft.chain);
      setNftSymbol(data.contract.symbol)
      setNftDescription(data.contract.metadata.description)
      setNftOwner(data.owner)
      } catch (error) {
        console.log('====================================');
        console.error(error);
        console.log('====================================');
      }
    }).catch(function (error) {
      console.error(error);
      setNftTitle("No Such NFT Available")
      setNftImage("Not Available")
      setNftChain("Not Available")
      setNftSymbol("Not Available")
      setNftDescription("Not Available")
      setNftOwner("Not Available")
    });
  }

  const contract = (event) => {
    setContractAddress(event.target.value);
  }

  const token = (event) => {
    setTokenId(event.target.value);
  }

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>NFT-details</title>
        <meta name="description" content="get nft details by providing nft contract address and token id" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <div className="card text-center" style={{ width: "20rem" }}>
          <div className="card-header">
            <Image src="/card.png"
              width={80}
              height={80}
              alt="NFT-Image"
            />
          </div>
          

          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="contractAddress" className="form-label">
                  Contract Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contractAddress"
                  onChange={contract}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tokenId" className="form-label">
                  Token ID
                </label>
                <input
                  type="tokenId"
                  className="form-control"
                  id="tokenId"
                  onChange={token}

                />
              </div>

            </form>
            <button type="button"
              className="btn btn-outline-dark btn-sm"
              onClick={data}
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Fetch
            </button>
          </div>
        </div>


        <>
          {/* Modal */}
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    NFT Details
                  </h1>
                </div>

                <div className="modal-body">

                  <div className="row">
                    <div className="col-sm-2">
                      <div className="card border-0">
                        <div className="card-body " >
                          <img
                            src={nftImage}
                            width={100}
                            height={100}
                            alt="NFT-Image"
                            style={{ border: "2px solid black", padding: "2px" }}
                          />

                        </div>
                      </div>
                    </div>
                    <div className="col-sm-9">
                      <div className="card border-0">
                        <div className="card-body">
                          <h6>Name: {nftTitle}</h6>
                          <h6>Symbol : {nftSymbol} </h6>
                          <h6>Description : {nftDescription}</h6>
                          <h6>Chain : {nftChain}</h6>
                          <h6>Contract Address : {contractAddress}</h6>
                          <h6>Token id : {tokenId} </h6>
                          <h6>Owner Address : {nftOwner}</h6>


                        </div>
                      </div>
                    </div>
                  </div>





                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>


      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}
