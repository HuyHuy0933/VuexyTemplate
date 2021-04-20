using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Infrastructure.FileUtil.Extensions
{
    public static class Image
    {
        public static bool IsImage(this byte[] fileBytes)
        {
            var headers = new List<byte[]>
            {
                Encoding.ASCII.GetBytes("BM"),      // BMP
                Encoding.ASCII.GetBytes("GIF"),     // GIF
                new byte[] { 137, 80, 78, 71 },     // PNG
                new byte[] { 73, 73, 42 },          // TIFF
                new byte[] { 77, 77, 42 },          // TIFF
                new byte[] { 255, 216, 255, 224 },  // JPEG
                new byte[] { 255, 216, 255, 225 }   // JPEG CANON
            };

            return headers.Any(x => x.SequenceEqual(fileBytes.Take(x.Length)));
        }

        public static List<string> GetBase64Sources(this string content)
        {
            MatchCollection matchList = Regex.Matches(content, "<img.+?src=[\"'](.+?)[\"'].*?>", RegexOptions.IgnoreCase);
            var list = matchList.Cast<Match>().Select(match => match.Groups[1].Value);
            return list.Where(src => src.StartsWith("data:image")).ToList();
        }

        public static string GetExtensionFromBase64ImageSource(this string src)
        {
            return src.Split(";")[0].Replace("data:image/", "");
        }

        public static string GetValueFromBase64ImageSource(this string src)
        {
            return src.Split(";")[1].Substring("base64,".Length);
        }
    }
}
