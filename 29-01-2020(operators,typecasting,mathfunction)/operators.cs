using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program
    {
        static void operators()
        {
            int a = 5;
            int b = 10;
            a += a;
            b = b / a;
            int c = a * b;
            Console.WriteLine("operators");
            Console.WriteLine(a);
            Console.WriteLine(b);
            Console.WriteLine(c);
        }

        static void Main(string[] args)
        {
            operators();
            Console.ReadKey();
        }
    }
}
