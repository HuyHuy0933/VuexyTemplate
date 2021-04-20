using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TheGioiSticker.Application.Models.Inputs.DecalPrices
{
	public class EditDecalPriceInput
	{
        public string Description { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public decimal PrintPrice { get; set; }
        [Required]
        public decimal CutPrint { get; set; }
        [Required]
        public decimal MachiningPrice { get; set; }
    }
}
