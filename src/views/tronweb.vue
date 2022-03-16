<template>
    <div class="hello">
        <h1>{{ msg }}</h1>

        <button @click="linkWallet">
            连接钱包
        </button>
        <button @click="getBalance">
            获取钱包余额
        </button>
        <button @click="transaction">
            TRX转账交易
        </button>
        <button @click="transactionToken">
            TRX-ERC20转账交易
        </button>
        <button @click="transactionContract">
            合约方法调用
        </button>

        <button @click="sq">
            授权
        </button>

        <button @click="sqzz">
            授权转账
        </button>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                msg: 'tron-web-dapp',
                tronWeb: null,
                walletAddress: null
            }

        },
        mounted() {
            console.log(window.tronWeb);
            if (window.tronWeb) {
                this.tronWeb = window.tronWeb;
                console.log('hahaha');
                console.log(this.tronWeb)
                this.walletAddress = this.tronWeb.defaultAddress.base58;
            }
        },
        methods: {
            async sq() {
                let instance = await window.tronWeb.contract().at('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t');
                console.log(instance);
                let authorized_address = 'TH25ZbHfDQ1pzwadPyhr7DujjtvWJuoJwF';
                let res = await instance["approve"](authorized_address,"90000000000000000000000000000");
                console.log(res);
                res.send({
					feeLimit: 100000000,
					callValue: 0,
					shouldPollResponse: false
				},function(err,res){
                    console.log('err',err);
                    console.log('res',res);
				})
            },
            async sqzz() {
                let instance = await window.tronWeb.contract().at('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t');
                let from = 'TFWX3BXabDANcgYAqU8US87FCqXXWwGd9g';
                var to = 'TTAvFS2bcAsFoUdWfWjzirFA9a5f21M8xS';
                var value = 1;
                await instance.transferFrom(from,to,value).send({},(err,res)=>{
                    console.log(err);
                    console.log(res);
                });
                // console.log(window.tronWeb);
            },


            linkWallet() {
                console.log('tronWeb',window.tronWeb);
                if (window.tronWeb) {
                    this.tronWeb = window.tronWeb;
                    console.log(window.tronWeb)
                    this.walletAddress = this.tronWeb.defaultAddress.base58;
                    console.log(this.tronWeb.defaultAddress.base58)
                }
            },
            //查询钱包余额
            async getBalance() {
                //当前连接的钱包地址获取 window.tronWeb.defaultAddress.base58
                var balance = await this.tronWeb.trx.getBalance(this.walletAddress);
                console.log("balance=", balance)
            },
            //trx转账交易
            async transaction() {
                console.log(this.walletAddress)
                var tx = await this.tronWeb.transactionBuilder.sendTrx(
                    'TEZagWGbjhwW1rHK9uf47GjqQcyaMgYr6M', 10, this.walletAddress
                );
                console.log(tx);
                
                var signedTx = await this.tronWeb.trx.sign(tx);
                var broastTx = await this.tronWeb.trx.sendRawTransaction(signedTx);
                console.log(broastTx)
            },
            //trx-token转账交易
            async transactionToken() {

                //转账方式1

                let contract = await this.tronWeb.contract().at("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t");
                let result = await contract.transfer(
                    "TTAvFS2bcAsFoUdWfWjzirFA9a5f21M8xS",
                    this.tronWeb.toHex(55 * Math.pow(10, 18))
                ).send({
                    feeLimit: 10000000
                }).then(output => {
                    console.log('- Output:', output, '\n');
                });
                console.log('result: ', result);

                //转账方式2
                /*const parameter = [{type:'address',value:'TN9RRaXkCFtTXRso2GdTZxSxxwufzxLQPP'},{type:'uint256',value:this.tronWeb.toHex(25 * Math.pow(10,18))}]
                var tx  = await this.tronWeb.transactionBuilder.triggerSmartContract("TURwoLuFy7maq1Vea7wVwRNz3HgmcAsJzb", "transfer(address,uint256)", {},parameter,this.walletAddress);
                var signedTx = await this.tronWeb.trx.sign(tx.transaction);
                var broastTx = await this.tronWeb.trx.sendRawTransaction(signedTx);
                console.log(broastTx)*/

                /*let contract = await this.tronWeb.contract().at("TURwoLuFy7maq1Vea7wVwRNz3HgmcAsJzb");
     let result1 = await contract.decimals().call();
     console.log('result: ', result1);*/
            },
            //调用合约中的方法
            async transactionContract() {

                //调用方式1
                // let contract = await this.tronWeb.contract().at("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t");
                // console.log("contract=",contract)
                // let result = await contract.registrationExt(
                //   "TN9RRaXkCFtTXRso2GdTZxSxxwufzxLQPP"
                // ).send({
                //   callValue: this.tronWeb.toHex(25 * Math.pow(10,6)),//发送TRX余额
                //   feeLimit: 10000000
                // }).then(output => {console.log('- Output:', output, '\n');});
                // console.log('result: ', result)

                //调用方式2
                const parameter = [{
                    type: 'address',
                    value: 'TTAvFS2bcAsFoUdWfWjzirFA9a5f21M8xS'
                }];
                var tx = await this.tronWeb.transactionBuilder.triggerSmartContract(
                    "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
                    "registrationExt(address)", {},
                    parameter,
                    this.walletAddress
                );
                var signedTx = await this.tronWeb.trx.sign(tx.transaction);
                var broastTx = await this.tronWeb.trx.sendRawTransaction(signedTx);
                console.log(broastTx)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1,
    h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>