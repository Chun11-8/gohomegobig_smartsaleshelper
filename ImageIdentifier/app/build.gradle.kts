plugins {
    alias(libs.plugins.android.application)
    id("com.google.gms.google-services")
    id("com.chaquo.python")

}

android {
    namespace = "com.example.myapplication"
    compileSdk = 34
    flavorDimensions += "pyVersion"
    productFlavors {
        create("py308") { dimension = "pyVersion" }
        create("py309") { dimension = "pyVersion" }

        create("py311") { dimension = "pyVersion" }
    }

    chaquopy {
        productFlavors {
            getByName("py308") { version = "3.8" }
            getByName("py309") { version = "3.9" }

            getByName("py311") { version = "3.11" }
        }

        defaultConfig {
            version = "3.9"
            buildPython("C:/Users/jazon/AppData/Local/Programs/Python/Python39/python.exe")
            pip{

            }
        }

        sourceSets {
            getByName("main") {
                srcDir("src/main/python")
            }
        }


    }

    defaultConfig {
        applicationId = "com.example.myapplication"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"

        ndk {
            abiFilters += listOf("arm64-v8a", "x86_64")
        }


        buildTypes {
            release {
                isMinifyEnabled = false
                proguardFiles(
                    getDefaultProguardFile("proguard-android-optimize.txt"),
                    "proguard-rules.pro"
                )
            }
        }
        compileOptions {
            sourceCompatibility = JavaVersion.VERSION_1_8
            targetCompatibility = JavaVersion.VERSION_1_8
        }
        buildFeatures {
            viewBinding = true
        }
    }
    buildToolsVersion = "34.0.0"
}

dependencies {

    implementation(libs.appcompat)
    implementation(libs.material)
    implementation(libs.constraintlayout)
    implementation(libs.lifecycle.livedata.ktx)
    implementation(libs.lifecycle.viewmodel.ktx)
    implementation(libs.navigation.fragment)
    implementation(libs.navigation.ui)
    implementation(libs.activity)
    testImplementation(libs.junit)
    androidTestImplementation(libs.ext.junit)
    androidTestImplementation(libs.espresso.core)

    implementation("com.vanniktech:android-image-cropper:4.5.0")

    implementation ("org.tensorflow:tensorflow-lite:2.14.0")
    implementation ("org.tensorflow:tensorflow-lite-gpu:2.14.0")
    implementation ("org.tensorflow:tensorflow-lite-support:0.4.4")
    implementation ("org.tensorflow:tensorflow-lite-metadata:0.4.4")// For image processing

    implementation(platform("com.google.firebase:firebase-bom:33.1.1"))
    implementation("com.google.firebase:firebase-analytics")
    implementation("com.google.firebase:firebase-firestore")

}