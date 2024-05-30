
import { useState } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


const Pdf = ({pdfUrl}) => {
  const [numPages, setNumPages] = useState(Number);
  const [pageNumber, setPageNumber] = useState(1);
      

  function onDocumentLoadSuccess(pdf)  {
    setNumPages(pdf?.numPages);
  } 


  return (
    <div className='position-relative'>
       <p>
        Page {pageNumber} of {numPages}
      </p>

      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
        {/* {
          Array.apply(null,Array(numPages))
          .map((v,i)=> i + 1)
          .map((page)=>{
            return( */}
                <Page 
                  pageNumber={pageNumber} 
                  renderTextLayer={false}
                  renderAnnotationLayer={false}      
                />
            {/* )
          })
        }  */}

        {
          numPages > 1 ?
            <div className="pdf-btn row">
              <div className="col">
                <button type='button' className={pageNumber===1 ? 'btn btn-transparent border border-brand-color ms-4 candidate-right-side-btn pe-none' :'btn btn-transparent border border-brand-color ms-4 candidate-right-side-btn'} onClick={()=>setPageNumber(pageNumber>1 ? pageNumber-1 : pageNumber)}>Previous</button>
              </div>
              <div className="col">
                <button type='button' className={pageNumber===numPages ? 'btn btn-transparent border border-brand-color candidate-right-side-btn pe-none' : 'btn btn-transparent border border-brand-color candidate-right-side-btn'} onClick={()=>setPageNumber(pageNumber<numPages ? pageNumber+1 : pageNumber)}>Next</button>
              </div>
            </div>

            :
            null
        }
      </Document>

    </div>
  )
}

export default Pdf