import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { GoodHarryData, IGoodReads } from "./dataloader/good_reads_csv";
import { isEmpty } from "./utils/StringUtils";
admin.initializeApp();

export const bulkInsert = functions.https.onRequest(
  async (request, response) => {
    let authorsRef = admin.firestore().collection("Authors");
    // let publicationsRef = admin.firestore().collection("Publications");
    let booksRef = admin.firestore().collection("Books");
    let bulkWriter = admin.firestore().bulkWriter();
    const createOrUpdateAuthors = async (book: IGoodReads) => {
      if (typeof book.authors !== "string") {
        const authorPromises = book.authors.map(async (author) => {
          let authorQuery = authorsRef.where("author", "==", author);
          let queryRes = await authorQuery.get();
          functions.logger.info("No Authors found with name: " + author);
          functions.logger.info(queryRes, {
            structuredData: true,
          });
          if (queryRes.empty) {
            let newAuthRef = authorsRef.doc();
            await bulkWriter.create(newAuthRef, {
              name: author,
              books: [book.isbn13],
            });
            functions.logger.info("Created Author Collection");
          }
        });
        await Promise.all(authorPromises);
      }
    };

    try {
      // let warehouseRef = admin.firestore().collection("Warehouse");
      functions.logger.info("Bulk Inserting from Good Read", {
        structuredData: true,
      });

      GoodHarryData.forEach(async (book): Promise<void> => {
        if (isEmpty(book.isbn13)) {
          let docRef = booksRef.doc(book.isbn13);

          const bookClone = Object.assign({}, book);
          if (isEmpty(bookClone.FIELD13 as string)) {
            delete bookClone.FIELD13;
          }
          delete bookClone.bookID;
          if (
            bookClone.publication_date &&
            typeof bookClone.publication_date === "string"
          ) {
            bookClone.publication_date = Date.parse(bookClone.publication_date);
          }
          // converting authors string to array if multiple authors are present
          if (
            typeof bookClone.authors === "string" &&
            bookClone.authors.includes("/")
          ) {
            bookClone.authors = bookClone.authors.split("/");
            await createOrUpdateAuthors(bookClone);
          }
          await bulkWriter.create(docRef, {
            ...bookClone,
          });
        }
      });
      //

      //  response.send({ message: "Insert SuccessFull" });
    } catch (error) {
      response.send(error);
      functions.logger.error(error);
    } finally {
      functions.logger.warn("------ CLOSING BULK WRITER --------");
      bulkWriter.close();
    }
  }
);
