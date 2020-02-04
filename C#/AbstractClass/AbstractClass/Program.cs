using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractClass
{
    abstract class Info
    {
        public void Hello()
        {
        Console.WriteLine("Hello");
        }
        public int age=21;
        public abstract void GetDetails(string x, string y);
    }

class User:Info
    {
        public override void GetDetails(string x, string y)
        {
            Hello();
            Console.WriteLine("Name: {0}", x);
            Console.WriteLine("Location: {0}", y);
            Console.WriteLine("Age: {0}", age);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            User u = new User();
            u.GetDetails("Chetan", "Raichur");
            Console.ReadKey();
        }
    }
}
