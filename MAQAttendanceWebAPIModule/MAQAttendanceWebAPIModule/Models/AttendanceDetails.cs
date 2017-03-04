using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MAQAttendanceWebAPIModule.Models
{
    public class AttendanceDetails
    {
        public string Day { get; set; }
        public string InTime { get; set; }
        public string OutTime { get; set; }
        public string IsOnTime { get; set; }
    }
}