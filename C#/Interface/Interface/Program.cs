using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interface
{
    interface inter
    {
        void GetDetails(string x);
    }
    class User:inter
    {
        public void GetDetails(string a)
        {
            Console.WriteLine("Name: {0}", a);
        }
    }

    class User1:inter
    {
        public void GetDetails(string a)
        {
            Console.WriteLine("Location: {0}", a);
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            inter i = new User();
            i.GetDetails("Chetan");
            inter i1 = new User1();
            i1.GetDetails("Raichur");
            Console.ReadKey(); 
        }
    }
}
