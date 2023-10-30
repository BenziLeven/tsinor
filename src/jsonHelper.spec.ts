import * as fs from "fs"
import mock from "mock-fs"
import { fileExists, createNewEmptyJsonFile, parseJsonFile, updateFile } from "./jsonHelper";
import { expect } from "chai";



describe("json Helper", () => {
    beforeEach(() => {
        mock({
            "./test/dir/": {
                "empty_file.json": `{"data": [\n]}`,
                "filled_file.json": `{"data":[\n{ "_id": 1, "entry": { "a": 1, "b": 2 } }\n]}`
            }
        });
    });

    describe("fileExists", () => {
        it("should return true if file exitst", () => {
            expect(fileExists("./test/dir/empty_file.json")).to.be.true;
        });
        
        it("should return false if file does't exist", () => {
            expect(fileExists("./test/dir/fake_file.json")).to.be.false;
        });
    });


    describe("createNewEmptyJsonFile", () => {
        it("should create a new json file at specified location",() => {
            createNewEmptyJsonFile("./test/dir/createdFile.json");

            expect(fileExists("./test/dir/createdFile.json")).to.be.true;
        });

        it("should create a new json file containing only an empty array",() => {
            createNewEmptyJsonFile("./test/dir/createdFile.json");

            const fileContent = fs.readFileSync("./test/dir/createdFile.json", { encoding: 'utf8', flag: 'r' });
            expect(fileContent).to.deep.equal(`{"data": [\n]}`)
        });
    });

    describe("parseJsonFile", () => {
        it("should return an empty array if file contains only an emty array", () => {
            expect(parseJsonFile("./test/dir/empty_file.json")).to.deep.equal([])
        })

        it("should return the parsed objects if the file contains data", () => {
            const fileData = parseJsonFile("./test/dir/filled_file.json");

            expect(fileData).to.deep.equal([{ _id: 1, entry: { a: 1, b: 2 } }]);
        });
    });

    describe("updateFile", () => {
        it("should update the file content", () => {
            updateFile("./test/dir/filled_file.json", [{ _id: 1, entry: { a: 1, b: 2 } }, { _id: 2, entry: { a: 4, b: 5 } }])

            const updatedfileData = parseJsonFile("./test/dir/filled_file.json");
            expect(updatedfileData).to.deep.equal([{ _id: 1, entry: { a: 1, b: 2 } }, { _id: 2, entry: { a: 4, b: 5 } }])
        })
    })

    afterEach(() => {
        mock.restore();
    });      
})