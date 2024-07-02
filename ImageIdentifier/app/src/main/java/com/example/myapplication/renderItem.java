package com.example.myapplication;

import static android.content.ContentValues.TAG;

import android.os.Bundle;
import android.util.Log;

import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.Firebase;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;

public class renderItem extends AppCompatActivity {

    FirebaseFirestore db = FirebaseFirestore.getInstance();
    ProductDetails obj;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.renderitem);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        DocumentReference docRef = db.collection("products").document("V7DZIz7KuY734dNYN1Ko");
        docRef.get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                if (task.isSuccessful()) {
                    DocumentSnapshot document = task.getResult();
                    if (document.exists()) {

                        String productName = document.getString("product_name");
                        Double productPrice =  document.getDouble("price");
                        String productImg = document.getString("product_img");
                        String productId = document.getString("product_id");
                        String companyName = document.getString("company_name");
                        obj = new ProductDetails(productId,productName,companyName,productPrice,productImg);


                        Log.d(TAG, "DocumentSnapshot data: " + document.getData());
                    } else {
                    }
                    Log.d(TAG, "No such document");
                } else {
                    Log.d(TAG, "get failed with ", task.getException());
                }
            }
        });



    }
}