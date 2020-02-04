using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstraction
{
    public class Laptop
    {
        private string brand;
        private string model;
        public string Brand
        {
            get { return brand; }
            set { brand = value; }
        }

        public string Model
        {
            get { return model; }
            set { model = value; }
        }

        public void LaptopDetails()
        {
            Console.WriteLine("Brand: " + Brand);
            Console.WriteLine("Model: " + Model);
        }

        public void LaptopKeyboard()
        {
            Console.WriteLine("Type using Keyword");
        }

        private void MotherBoardInfo()
        {
            Console.WriteLine("MotheBoard Information");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Laptop l = new Laptop();
            l.Brand = "Lenovo";
            l.Model = "Ideapad 310";
            l.LaptopDetails();
            l.LaptopKeyboard();
            //l.MotherBoardInfo(); As this is a function of private type so info cannot be accessed.
            Console.ReadLine();
        }
    }
}
