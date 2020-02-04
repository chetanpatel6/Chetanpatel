using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Method_Overriding
{
    public class BClass
    {
        public virtual void GetInfo()
        {
            Console.WriteLine("Learn C# Tutorial");
        }
    }

    public class DClass : BClass
    {
        public override void GetInfo()
        {
            Console.WriteLine("Welcome to Tutlane");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            DClass d = new DClass();
            d.GetInfo();        
            BClass b = new BClass();
            b.GetInfo();
            Console.ReadLine();
        }
    }
}
