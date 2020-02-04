using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MultilevelInheritance
{
    public class A
    {
        public string Name;
        public void GetName()
        {
            Console.WriteLine("Name: {0}", Name);
        }
    }

    public class B : A
    {
        public string Location;
        public void GetLocation()
        {
            Console.WriteLine("Location: {0}", Location);
        }
    }

    public class C : B
    {
        public int Age;
        public void GetAge()
        {
            Console.WriteLine("Age: {0}", Age);
        }
    }

    class Program    
    {
        static void Main(string[] args)
        {
            C c = new C();
            c.Name = "Chetan Patel";
            c.Location = "Raichur";
            c.Age = 21;
            c.GetName();
            c.GetLocation();
            c.GetAge();
            Console.ReadLine();
        }
    }
}
