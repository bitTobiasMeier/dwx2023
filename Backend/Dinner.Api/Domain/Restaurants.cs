using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace Dinner.Api.Domain;


public class Restaurant
{
    [JsonConstructor]
    public Restaurant(int id, string name, Address address)
    {
        Id = id;
        Name = name;
        Address = address;
    }

    public int Id { get; set; }
    public string Name { get; set; }

    public Address Address { get; set; }
}


public class Person
{
    [JsonConstructor]
    public Person(string vorname, string nachname, string phoneNumber)
    {
        this.Vorname = vorname;
        this.Nachname = nachname;
        this.PhoneNumber = phoneNumber;
    }

    public string Vorname { get; set; }

    public string Nachname { get; set; }

    public string PhoneNumber { get; set; }
}


public class Address
{
    [JsonConstructor]
    public Address(string street, string housenumber, string city, string postalCode, string country)
    {
        Street = street;
        Housenumber = housenumber;
        City = city;
        PostalCode = postalCode;
        Country = country;
    }

    public string Street { get; set; }

    public string Housenumber { get; set; }

    public string City { get; set; }

    public string PostalCode { get; set; }

    public string Country { get; set; }
}



public class Company
{
    [JsonConstructor]
    public Company(string name, Person contact)
    {
        Name = name;
        Contact = contact;
    }

    public string Name { get; set; }

    public Person Contact { get; set; }
}

public enum ReservationContactTypes {
  PrivateReservation=0,
  CompanyReservation=1
}


public class ReservationContact
{
    public ReservationContact()
    {
    }

    public ReservationContact(Company companyReservation)
    {
        this.Kind = ReservationContactTypes.CompanyReservation;
        this.CompanyReservation = companyReservation;
        this.PrivateReservation = null;
    }

    public ReservationContact(Person privateReservation)
    {
        this.Kind = ReservationContactTypes.PrivateReservation;
        this.PrivateReservation = privateReservation;
        this.CompanyReservation = null;
    }

    [NotNull]
    public ReservationContactTypes Kind { get; set; }

    public Company? CompanyReservation { get; set; }

    public Person? PrivateReservation { get; set; }

}

public class Reservation
{
    [JsonConstructor]
    public Reservation(int? id, DateTime date, int restaurantId, ReservationContact contact, int personcount)
    {
        Id = id;
        this.RestaurantId = restaurantId;
        Date = date;
        Contact = contact;
        Personcount = personcount;
    }

    public int? Id { get; set; }

    public int RestaurantId { get; set; }

    public DateTime Date { get; set; }

    [NotNull]
    public ReservationContact Contact { get; set; }

    public int Personcount { get; set; }
}