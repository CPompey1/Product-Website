import React from 'react'

export default function StoreEditPage() {
  return (
    <>
        <form action="upload.php" method="post" enctype="multipart/form-data">

            <input type="file" name="images[]" multiple accept="image/*"/>

            <button type="submit">Upload Images</button>

        </form>
    </>
  )
}
