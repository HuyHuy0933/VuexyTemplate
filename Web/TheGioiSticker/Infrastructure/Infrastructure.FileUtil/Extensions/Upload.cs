using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Infrastructure.FileUtil.Extensions
{
    public class Upload
    {
        public static async Task<string> UploadImageAsync(IFormFile image, string path)
        {
            //Check input
            if (image == null)
            {
                throw new Exception("Vui lòng chọn hình ảnh!");
            }

            byte[] fileBytes;
            await using (var stream = image.OpenReadStream())
            {
                fileBytes = ReadToEnd(stream);
            }

            // Check valid image files
            if (fileBytes.IsImage() is false)
            {
                throw new Exception("Định dạng file không phải hình ảnh");
            };

            // Create path if not exist
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            //Save new picture
            var tempFileName = $"[{Guid.NewGuid()}]{image.FileName}";
            var tempFilePath = Path.Combine(path, tempFileName);

            ByteArrayToFile(tempFilePath, fileBytes);

            return tempFileName;
        }

        public static bool ByteArrayToFile(string filePath, byte[] byteArray)
        {
            try
            {
                var file = new FileInfo(filePath);
                //  create path if not exist
                if (file.Directory != null && !file.Directory.Exists)
                {
                    Directory.CreateDirectory(file.Directory.FullName);
                }

                File.WriteAllBytes(filePath, byteArray);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught in process: {0}", ex);
                return false;
            }
        }

        public static byte[] ReadToEnd(Stream stream)
        {
            long originalPosition = 0;

            if (stream.CanSeek)
            {
                originalPosition = stream.Position;
                stream.Position = 0;
            }

            try
            {
                byte[] readBuffer = new byte[4096];

                int totalBytesRead = 0;
                int bytesRead;

                while ((bytesRead = stream.Read(readBuffer, totalBytesRead, readBuffer.Length - totalBytesRead)) > 0)
                {
                    totalBytesRead += bytesRead;

                    if (totalBytesRead == readBuffer.Length)
                    {
                        int nextByte = stream.ReadByte();
                        if (nextByte != -1)
                        {
                            byte[] temp = new byte[readBuffer.Length * 2];
                            Buffer.BlockCopy(readBuffer, 0, temp, 0, readBuffer.Length);
                            Buffer.SetByte(temp, totalBytesRead, (byte)nextByte);
                            readBuffer = temp;
                            totalBytesRead++;
                        }
                    }
                }

                byte[] buffer = readBuffer;
                if (readBuffer.Length != totalBytesRead)
                {
                    buffer = new byte[totalBytesRead];
                    Buffer.BlockCopy(readBuffer, 0, buffer, 0, totalBytesRead);
                }
                return buffer;
            }
            finally
            {
                if (stream.CanSeek)
                {
                    stream.Position = originalPosition;
                }
            }
        }
    }
}
