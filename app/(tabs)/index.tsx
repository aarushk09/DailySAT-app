// import React from 'react';
// import { View, StyleSheet, ScrollView } from 'react-native';
// import { Text, Card, Title, Paragraph, Button, ProgressBar, Avatar } from 'react-native-paper';
// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// export default function HomeScreen() {
//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.welcomeText}>Welcome back, Alex John!</Text>
//         <Text style={styles.dateText}>March 9, 2025</Text>
//       </View>
      
//       <Card style={styles.overviewCard}>
//         <Card.Content>
//           <Title>Your Progress</Title>
//           <View style={styles.progressSection}>
//             <View style={styles.progressItem}>
//               <Text style={styles.progressLabel}>Reading</Text>
//               <ProgressBar progress={0.65} color="#4cc9f0" style={styles.progressBar} />
//               <Text style={styles.progressText}>65%</Text>
//             </View>
//             <View style={styles.progressItem}>
//               <Text style={styles.progressLabel}>Math</Text>
//               <ProgressBar progress={0.82} color="#f72585" style={styles.progressBar} />
//               <Text style={styles.progressText}>82%</Text>
//             </View>
//           </View>
//         </Card.Content>
//       </Card>
      
//       <Text style={styles.sectionTitle}>Continue Learning</Text>
      
//       <Card style={styles.continueCard}>
//         <Card.Content>
//           <View style={styles.continueHeader}>
//             <View style={[styles.iconContainer, { backgroundColor: "#f72585" }]}>
//             <MaterialCommunityIcons name="calculator" size={24} color="white" />
//             </View>
//             <View style={styles.continueInfo}>
//               <Title>Quadratic Equations</Title>
//               <Paragraph>Master equations in the form ax² + bx + c = 0</Paragraph>
//             </View>
//           </View>
//           <ProgressBar progress={0.7} color="#f72585" style={styles.progressBar} />
//           <Text style={styles.progressText}>70% Complete</Text>
//         </Card.Content>
//         <Card.Actions>
//           <Button 
//             mode="contained" 
//             onPress={() => router.push({
//               pathname: '/topic',
//               params: { section: 'math', topicId: 'algebra', subtopic: '1' }
//             })}
//             style={{ backgroundColor: "#f72585" }}
//           >
//             Continue
//           </Button>
//         </Card.Actions>
//       </Card>
      
//       <Text style={styles.sectionTitle}>Recent Activity</Text>
      
//       <Card style={styles.activityCard}>
//         <Card.Content>
//           <View style={styles.activityItem}>
//             <Avatar.Icon size={40} icon="check" style={{ backgroundColor: "#06d6a0" }} />
//             <View style={styles.activityInfo}>
//               <Text style={styles.activityTitle}>Completed "Linear Equations"</Text>
//               <Text style={styles.activityTime}>Today, 2:30 PM</Text>
//             </View>
//           </View>
          
//           <View style={styles.activityItem}>
//             <Avatar.Icon size={40} icon="star" style={{ backgroundColor: "#ffd166" }} />
//             <View style={styles.activityInfo}>
//               <Text style={styles.activityTitle}>Earned 50 points in Math</Text>
//               <Text style={styles.activityTime}>Today, 1:15 PM</Text>
//             </View>
//           </View>
//         </Card.Content>
//       </Card>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   header: {
//     padding: 20,
//     paddingTop: 10,
//   },
//   welcomeText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#212529',
//   },
//   dateText: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 5,
//   },
//   overviewCard: {
//     margin: 16,
//     elevation: 4,
//   },
//   progressSection: {
//     marginTop: 15,
//   },
//   progressItem: {
//     marginBottom: 15,
//   },
//   progressLabel: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   progressBar: {
//     height: 8,
//     borderRadius: 4,
//   },
//   progressText: {
//     fontSize: 12,
//     textAlign: 'right',
//     marginTop: 5,
//     color: '#666',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginHorizontal: 16,
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   continueCard: {
//     margin: 16,
//     marginTop: 8,
//     elevation: 4,
//   },
//   continueHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   iconContainer: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   continueInfo: {
//     flex: 1,
//   },
//   activityCard: {
//     margin: 16,
//     marginTop: 8,
//     elevation: 4,
//   },
//   activityItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   activityInfo: {
//     marginLeft: 15,
//     flex: 1,
//   },
//   activityTitle: {
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   activityTime: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 2,
//   },
// });

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Image, ActivityIndicator } from 'react-native';
import { signIn } from 'next-auth/react';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle login with credentials
  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');

    signIn('credentials', {
      redirect: false,
      email,
      password,
    })
      .then((result) => {
        if (result?.error) {
          setError(result.error);
        } else {
          console.log('Logged in successfully');
        }
      })
      .catch((err) => {
        console.error('Login failed:', err);
        setError('Login failed. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    setLoading(true);
    setError('');

    signIn('google', { callbackUrl: '/' })
      .catch((err) => {
        console.error('Google login error:', err);
        setError('Google login failed. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/150' }} 
              style={styles.logo} 
              resizeMode="contain"
            />
            {/* <Text style={styles.appTitle}>DailySat</Text> */}
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.subText}>Sign in to continue</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
              />
            </View>
            
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            
            {error ? <Text style={styles.error}>{error}</Text> : null}
            
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>
            
            <View style={styles.orContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>
            
            <TouchableOpacity 
              style={styles.googleButton} 
              onPress={handleGoogleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#4285F4" size="small" />
              ) : (
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 55,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#4285F4',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#4285F4',
    borderRadius: 8,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#4285F4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e1e1e1',
  },
  orText: {
    marginHorizontal: 10,
    color: '#666',
  },
  googleButton: {
    flexDirection: 'row',
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 8,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  googleButtonText: {
    color: '#4285F4',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    paddingBottom: 20,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  signUpText: {
    color: '#4285F4',
    fontWeight: '600',
    fontSize: 14,
  }
});