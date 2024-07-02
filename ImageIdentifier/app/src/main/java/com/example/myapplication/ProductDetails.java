package com.example.myapplication;

public class ProductDetails {
    private String id;
    private String  name;
    private String company;
    private Double price;
    private String img;

    public ProductDetails(String id,String name,String company,Double price,String img){
        this.id = id;
        this.name = name;
        this.company = company;
        this.price = price;
        this.img = img;
    }


    public String getId(){
        return id;
    }

    public String getName(){
        return name;
    }

    public String getCompany(){
        return company;
    }

    public String getImg(){
        return img;
    }

    public Double getPrice(){
        return price;
    }

}
