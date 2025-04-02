class CryptoModule {
    static hashToBinary(hash : string) : string {
        let binary : string = "";
        for (let i = 0; i < hash.length; i++) {
            const hexByte = hash.substr(i,2);
            const dec = parseInt(hexByte, 16);
            const binaryByte = dec.toString(2).padStart(8, "0");
            binary += binaryByte;
        }

        return binary;
    }
}

export default CryptoModule;